import { useState, useEffect, useCallback } from 'react';
import { GRID_SIZE, DEFAULT_COLOR } from '../constants';
import { supabase } from '../supabaseClient';

export type GridState = string[];

interface PixelRecord {
  id: string;
  x: number;
  y: number;
  color: string;
  updated_at: string;
}

export function usePixelGrid() {
  // Initialize with default color
  const [grid, setGrid] = useState<GridState>(Array(GRID_SIZE * GRID_SIZE).fill(DEFAULT_COLOR));
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [loading, setLoading] = useState(true);

  // Helper to convert index to coordinates
  const getCoords = (index: number) => ({
    x: index % GRID_SIZE,
    y: Math.floor(index / GRID_SIZE)
  });

  // Helper to convert coordinates to index
  const getIndex = (x: number, y: number) => y * GRID_SIZE + x;

  // Fetch initial state and subscribe to changes
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const { data, error } = await supabase
          .from('pixels')
          .select('*');

        if (error) {
          console.error('Error fetching pixels:', error);
          return;
        }

        if (data) {
          setGrid(prevGrid => {
            const newGrid = [...prevGrid];
            data.forEach((pixel: PixelRecord) => {
              const index = getIndex(pixel.x, pixel.y);
              if (index >= 0 && index < newGrid.length) {
                newGrid[index] = pixel.color;
              }
            });
            return newGrid;
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialState();

    // Realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'pixels',
        },
        (payload) => {
          const { eventType, new: newRecord } = payload;
          
          if (eventType === 'INSERT' || eventType === 'UPDATE') {
            const pixel = newRecord as PixelRecord;
            const index = getIndex(pixel.x, pixel.y);
            setGrid(prev => {
              const newGrid = [...prev];
              newGrid[index] = pixel.color;
              return newGrid;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const paintPixel = useCallback(async (index: number) => {
    // Optimistic update
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[index] = selectedColor;
      return newGrid;
    });

    const { x, y } = getCoords(index);
    const id = `${x}_${y}`;

    // Send to Supabase
    const { error } = await supabase
      .from('pixels')
      .upsert({
        id,
        x,
        y,
        color: selectedColor,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error updating pixel:', error);
      // Optionally revert optimistic update here if needed
    }
  }, [selectedColor]);

  const clearGrid = useCallback(async () => {
    if (!window.confirm('Are you sure you want to nuke the canvas? This will delete ALL pixels from the server!')) {
      return;
    }

    // Optimistic clear
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(DEFAULT_COLOR));

    // Delete all rows (Tricky in Supabase RLS, but assuming we have access)
    // Usually DELETE without WHERE is blocked, so we might need a different strategy
    // or just iterate. For this hackathon, let's try a broad delete or just re-initialize.
    // A "Nuke" in a collaborative app is dangerous. 
    // Let's implement it as "Reset my view" or try to delete where x >= 0.
    
    const { error } = await supabase
      .from('pixels')
      .delete()
      .neq('id', 'placeholder'); // Hack to delete all if policy allows

    if (error) {
      console.error('Error clearing grid:', error);
    }
  }, []);

  return {
    grid,
    selectedColor,
    setSelectedColor,
    paintPixel,
    clearGrid,
    loading
  };
}
