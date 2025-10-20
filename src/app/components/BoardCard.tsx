import { Board } from "@/store/boardStore";
import { Card } from "@/app/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface BoardCardProps {
  board: Board;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export const BoardCard = ({ board, onDelete, onClick }: BoardCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Eliminar el tablero "${board.title}"?`)) {
      onDelete(board.id);
    }
  };

  return (
    <Card
      className="group relative h-32 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-primary/10 to-primary/5"
      onClick={onClick}
    >
      <div className="p-4 h-full flex flex-col justify-between">
        <h3 className="font-semibold text-lg text-foreground">{board.title}</h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {board.lists.length} listas
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
