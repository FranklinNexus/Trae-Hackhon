import { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, DEFAULT_COLOR } from '../constants';
import { supabase } from '../supabaseClient';

export type GridState = string[];

const CLICK_SFX =
  'data:audio/wav;base64,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';
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
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(CLICK_SFX);
    audio.volume = 0.3;
    clickAudioRef.current = audio;
  }, []);

  const triggerClick = useCallback(() => {
    const base = clickAudioRef.current;
    if (!base) return;
    const clone = base.cloneNode(true) as HTMLAudioElement;
    clone.volume = base.volume;
    // Randomize pitch for juicy organic feel
    clone.playbackRate = 0.9 + Math.random() * 0.2;
    clone.play().catch(() => {});
  }, []);

  // Helper to convert index to coordinates
  const getCoords = useCallback((index: number) => ({
    x: index % GRID_SIZE,
    y: Math.floor(index / GRID_SIZE),
  }), []);

  // Helper to convert coordinates to index
  const getIndex = useCallback((x: number, y: number) => y * GRID_SIZE + x, []);

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
  }, [getIndex]);

  const paintPixel = useCallback(async (index: number) => {
    // Optimistic update
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[index] = selectedColor;
      return newGrid;
    });

    const { x, y } = getCoords(index);
    const id = `${x}_${y}`;

    triggerClick();

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
  }, [selectedColor, getCoords, triggerClick]);

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
