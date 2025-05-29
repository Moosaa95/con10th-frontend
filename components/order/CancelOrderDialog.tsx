import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CancelOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string) => void;
}

export function CancelOrderDialog({ open, onOpenChange, onSubmit }: CancelOrderDialogProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onSubmit(reason);
    onOpenChange(false);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Cancel Order</DialogTitle>
          <DialogDescription>
            Please provide a reason for cancelling this order. This will help us improve our services.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Enter your reason for cancellation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-32 resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Never mind
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Cancel Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
