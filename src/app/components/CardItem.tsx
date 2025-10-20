import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardType } from "@/store/boardStore";
import { Card } from "@/app/components/ui/card";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface CardItemProps {
  card: CardType;
  onDelete: () => void;
  onUpdate: (title: string) => void;
}

export const CardItem = ({ card, onDelete, onUpdate }: CardItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditTitle(card.title);
      setIsEditing(false);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="group mb-2 p-3 bg-card hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="h-auto py-1 px-2"
              autoFocus
            />
          ) : (
            <p
              className="text-sm break-words"
              onClick={() => setIsEditing(true)}
            >
              {card.title}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 text-destructive hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};
