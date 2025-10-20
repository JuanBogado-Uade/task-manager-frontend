"use client";
// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useBoardStore } from "@/store/boardStore";
// import { useProyectoStore } from "@/store/proyectosStore";
// import { Navbar } from "@/app/components/Navbar";
// import { ListColumn } from "@/app/components/ListColumn";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Plus, ArrowLeft } from "lucide-react";
// import { Card } from "@/app/components/ui/card";
// import {
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";

export default function BoardView() {
// const params = useParams();
// const router = useRouter();
// const boardId = params?.id as string | undefined;
// console.log(params);

// console.log("Board ID from params:", boardId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Funcionalidad en desarrollo</h2>
        <p className="text-sm text-muted-foreground mb-4">
          La vista del tablero está en construcción. Por favor, vuelve más tarde.
        </p>
      </div>
    </div>
  );
}

//   const params = useParams();
//   const router = useRouter();
//   const boardId = params?.id as string | undefined;

//   const {
//     boards,
//     createList,
//     deleteList,
//     updateListTitle,
//     createCard,
//     deleteCard,
//     updateCardTitle,
//     moveCard,
//   } = useBoardStore();

//   const [isCreatingList, setIsCreatingList] = useState(false);
//   const [newListTitle, setNewListTitle] = useState("");
//   const [activeCard, setActiveCard] = useState<any>(null);
// console.log("Board ID from params:", boardId);

//   const board = boards.find((b) => b.id === boardId);
//   console.log("Board found:", board);
  

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8,
//       },
//     })
//   );

//   // useEffect(() => {
//   //   if (!board) {
//   //     // si no existe el tablero, redirigir al dashboard principal
//   //     router.replace("/");
//   //   }
//   // }, [board, router]);

//   if (!board) return null;

//   const handleCreateList = () => {
//     if (newListTitle.trim()) {
//       createList(board.id, newListTitle.trim());
//       setNewListTitle("");
//       setIsCreatingList(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleCreateList();
//     } else if (e.key === "Escape") {
//       setIsCreatingList(false);
//       setNewListTitle("");
//     }
//   };

//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event;
//     const card = board.lists
//       .flatMap((list) => list.cards)
//       .find((c) => c.id === active.id);
//     setActiveCard(card ?? null);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     setActiveCard(null);

//     if (!over || active.id === over.id) return;

//     const activeCard = board.lists
//       .flatMap((list) => list.cards)
//       .find((c) => c.id === active.id);

//     if (!activeCard) return;

//     // encontrar la lista destino (puede ser la lista misma o una tarjeta dentro de la lista)
//     const overList = board.lists.find(
//       (list) =>
//         list.id === over.id || list.cards.some((c) => c.id === over.id)
//     );

//     if (!overList) return;

//     const sourceList = board.lists.find((list) => list.id === activeCard.listId);
//     if (!sourceList) return;

//     // calcular nueva posición
//     let newPosition = 0;
//     if (over.id !== overList.id) {
//       // soltado sobre una tarjeta -> insertar en la posición de esa tarjeta
//       newPosition = overList.cards.findIndex((c) => c.id === over.id);
//       if (newPosition === -1) newPosition = 0;
//     } else {
//       // soltado en la lista (al final)
//       newPosition = overList.cards.length;
//     }

//     moveCard(board.id, activeCard.id, sourceList.id, overList.id, newPosition);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background">
//       <Navbar />

//       <div className="p-4">
//         <div className="flex items-center gap-4 mb-6">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => router.push("/dashboard")}
//             aria-label="Volver"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <h1 className="text-2xl font-bold">{board.title}</h1>
//         </div>

//         <DndContext
//           sensors={sensors}
//           onDragStart={handleDragStart}
//           onDragEnd={handleDragEnd}
//         >
//           <div className="flex gap-4 overflow-x-auto pb-4">
//             {board.lists.map((list) => (
//               <ListColumn
//                 key={list.id}
//                 list={list}
//                 onDeleteList={() => {
//                   if (confirm(`¿Eliminar la lista "${list.title}"?`)) {
//                     deleteList(board.id, list.id);
//                   }
//                 }}
//                 onUpdateListTitle={(title) =>
//                   updateListTitle(board.id, list.id, title)
//                 }
//                 onCreateCard={(title) => createCard(board.id, list.id, title)}
//                 onDeleteCard={(cardId) => {
//                   if (confirm("¿Eliminar esta tarjeta?")) {
//                     deleteCard(board.id, list.id, cardId);
//                   }
//                 }}
//                 onUpdateCard={(cardId, title) =>
//                   updateCardTitle(board.id, list.id, cardId, title)
//                 }
//               />
//             ))}

//             {isCreatingList ? (
//               <Card className="w-72 flex-shrink-0 p-3">
//                 <Input
//                   placeholder="Título de la lista..."
//                   value={newListTitle}
//                   onChange={(e) => setNewListTitle(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="mb-2"
//                   autoFocus
//                 />
//                 <div className="flex gap-2">
//                   <Button size="sm" onClick={handleCreateList}>
//                     Añadir lista
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => {
//                       setIsCreatingList(false);
//                       setNewListTitle("");
//                     }}
//                   >
//                     Cancelar
//                   </Button>
//                 </div>
//               </Card>
//             ) : (
//               <Card
//                 className="w-72 flex-shrink-0 h-fit cursor-pointer hover:bg-accent/50 transition-colors p-3"
//                 onClick={() => setIsCreatingList(true)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     setIsCreatingList(true);
//                   }
//                 }}
//                 aria-label="Añadir lista"
//               >
//                 <div className="flex items-center gap-2 text-muted-foreground">
//                   <Plus className="h-4 w-4" />
//                   <span className="font-medium">Añadir lista</span>
//                 </div>
//               </Card>
//             )}
//           </div>

//           <DragOverlay>
//             {activeCard ? (
//               <Card className="p-3 bg-card opacity-90 cursor-grabbing w-72">
//                 <p className="text-sm">{activeCard.title}</p>
//               </Card>
//             ) : null}
//           </DragOverlay>
//         </DndContext>
//       </div>
//     </div>
//   );
//  }


