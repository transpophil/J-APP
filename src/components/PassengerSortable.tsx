"use client";

import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Edit, Trash2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Passenger = Tables<"passengers">;

type Props = {
  passengers: Passenger[];
  onReorder: (next: Passenger[]) => void;
  onEdit: (passenger: Passenger) => void;
  onDelete: (passengerId: string) => void;
};

const PassengerSortable: React.FC<Props> = ({ passengers, onReorder, onEdit, onDelete }) => {
  const dragSourceId = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    dragSourceId.current = id;
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, targetId: string) {
    e.preventDefault();
    const sourceId = dragSourceId.current;
    setDraggingId(null);
    dragSourceId.current = null;
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = passengers.findIndex((p) => p.id === sourceId);
    const targetIndex = passengers.findIndex((p) => p.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const next = [...passengers];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    onReorder(next);
  }

  return (
    <div className="space-y-3">
      {passengers.map((passenger) => {
        const isDragging = draggingId === passenger.id;
        return (
          <Card
            key={passenger.id}
            className={`p-4 transition-all ${
              isDragging ? "ring-2 ring-primary shadow-lg" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, passenger.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, passenger.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <GripVertical className="mt-1 h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{passenger.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Default Pickup:</span> {passenger.default_pickup_location}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(passenger)}
                  aria-label={`Edit ${passenger.name}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(passenger.id)}
                  aria-label={`Delete ${passenger.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default PassengerSortable;