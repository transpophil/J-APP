import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type Destination = {
  id: string;
  name: string;
  address: string;
};

type DestinationPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinations: Destination[];
  onSelect: (destination: Destination) => void;
};

const DestinationPickerDialog: React.FC<DestinationPickerDialogProps> = ({
  open,
  onOpenChange,
  destinations,
  onSelect,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Destination</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {destinations.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No destinations configured yet. Please ask an admin to add destinations.
            </div>
          ) : (
            <div className="grid gap-3">
              {destinations.map((d) => (
                <Button
                  key={d.id}
                  variant="outline"
                  className="justify-start h-auto py-3 flex flex-col items-start"
                  onClick={() => onSelect(d)}
                >
                  <span className="font-semibold">{d.name}</span>
                  <span className="text-xs text-muted-foreground">{d.address}</span>
                </Button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationPickerDialog;