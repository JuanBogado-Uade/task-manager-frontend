// import { useState } from "react";
// import { useDroppable } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import { List } from "@/store/boardStore";
// import { Card } from "@/app/components/ui/card";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Trash2, Plus } from "lucide-react";
// import { CardItem } from "./CardItem";

// interface ListColumnProps {
//   list: List;
//   onDeleteList: () => void;
//   onUpdateListTitle: (title: string) => void;
//   onCreateCard: (title: string) => void;
//   onDeleteCard: (cardId: string) => void;
//   onUpdateCard: (cardId: string, title: string) => void;
// }

// export const ListColumn = ({
//   list,
//   onDeleteList,
//   onUpdateListTitle,
//   onCreateCard,
//   onDeleteCard,
//   onUpdateCard,
// }: ListColumnProps) => {
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [editTitle, setEditTitle] = useState(list.title);
//   const [isAddingCard, setIsAddingCard] = useState(false);
//   const [newCardTitle, setNewCardTitle] = useState("");

//   const { setNodeRef } = useDroppable({ id: list.id });

//   const handleSaveTitle = () => {
//     if (editTitle.trim()) {
//       onUpdateListTitle(editTitle.trim());
//       setIsEditingTitle(false);
//     }
//   };

//   const handleAddCard = () => {
//     if (newCardTitle.trim()) {
//       onCreateCard(newCardTitle.trim());
//       setNewCardTitle("");
//       setIsAddingCard(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       if (isEditingTitle) {
//         handleSaveTitle();
//       } else {
//         handleAddCard();
//       }
//     } else if (e.key === "Escape") {
//       if (isEditingTitle) {
//         setEditTitle(list.title);
//         setIsEditingTitle(false);
//       } else {
//         setNewCardTitle("");
//         setIsAddingCard(false);
//       }
//     }
//   };

//   return (
//     <Card className="w-72 flex-shrink-0 bg-muted/50 p-3">
//       <div className="flex items-center justify-between mb-3">
//         {isEditingTitle ? (
//           <Input
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             onBlur={handleSaveTitle}
//             onKeyDown={handleKeyDown}
//             className="h-8 font-semibold"
//             autoFocus
//           />
//         ) : (
//           <h3
//             className="font-semibold text-sm flex-1 cursor-pointer hover:bg-accent/50 px-2 py-1 rounded"
//             onClick={() => setIsEditingTitle(true)}
//           >
//             {list.title}
//           </h3>
//         )}

//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-8 w-8 text-destructive hover:text-destructive"
//           onClick={onDeleteList}
//         >
//           <Trash2 className="h-4 w-4" />
//         </Button>
//       </div>

//       <div ref={setNodeRef} className="min-h-[100px]">
//         <SortableContext items={list.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
//           {list.cards.map((card) => (
//             <CardItem
//               key={card.id}
//               card={card}
//               onDelete={() => onDeleteCard(card.id)}
//               onUpdate={(title) => onUpdateCard(card.id, title)}
//             />
//           ))}
//         </SortableContext>
//       </div>

//       {isAddingCard ? (
//         <div className="mt-2">
//           <Input
//             value={newCardTitle}
//             onChange={(e) => setNewCardTitle(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Título de la tarjeta..."
//             className="mb-2"
//             autoFocus
//           />
//           <div className="flex gap-2">
//             <Button size="sm" onClick={handleAddCard}>
//               Añadir
//             </Button>
//             <Button
//               size="sm"
//               variant="ghost"
//               onClick={() => {
//                 setIsAddingCard(false);
//                 setNewCardTitle("");
//               }}
//             >
//               Cancelar
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <Button
//           variant="ghost"
//           className="w-full mt-2 justify-start gap-2"
//           onClick={() => setIsAddingCard(true)}
//         >
//           <Plus className="h-4 w-4" />
//           Añadir tarjeta
//         </Button>
//       )}
//     </Card>
//   );
// };
