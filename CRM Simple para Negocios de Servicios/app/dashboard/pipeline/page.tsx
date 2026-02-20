'use client';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { Deal, DealStage } from '@/lib/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, DollarSign, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const STAGES: { id: DealStage; label: string; color: string }[] = [
  { id: 'prospect', label: 'Prospecto', color: 'bg-slate-100 border-slate-200' },
  { id: 'contacted', label: 'Contactado', color: 'bg-blue-50 border-blue-100' },
  { id: 'proposal', label: 'Propuesta', color: 'bg-amber-50 border-amber-100' },
  { id: 'negotiation', label: 'Negociación', color: 'bg-purple-50 border-purple-100' },
  { id: 'closed', label: 'Cerrado', color: 'bg-emerald-50 border-emerald-100' },
];

export default function PipelinePage() {
  const { state, dispatch } = useApp();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startStage = source.droppableId as DealStage;
    const finishStage = destination.droppableId as DealStage;

    dispatch({
      type: 'UPDATE_DEAL_STAGE',
      payload: { dealId: draggableId, stage: finishStage },
    });
  };

  if (!isBrowser) return null;

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pipeline de Ventas</h1>
          <p className="text-slate-500 text-sm">Gestiona tus oportunidades</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
          <Plus size={18} />
          Nuevo Deal
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
          {STAGES.map(stage => {
            const stageDeals = state.deals.filter(d => d.stage === stage.id);
            const totalValue = stageDeals.reduce((acc, d) => acc + d.value, 0);

            return (
              <div key={stage.id} className={`min-w-[280px] w-80 flex flex-col rounded-xl border ${stage.color} h-full`}>
                <div className="p-3 border-b border-black/5 flex justify-between items-center bg-white/50 rounded-t-xl">
                  <div>
                    <h3 className="font-semibold text-slate-700">{stage.label}</h3>
                    <p className="text-xs text-slate-500">{stageDeals.length} deals • ${totalValue.toLocaleString()}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stage.color.replace('bg-', 'bg-').replace('50', '400')}`} />
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 p-2 space-y-3 overflow-y-auto transition-colors ${
                        snapshot.isDraggingOver ? 'bg-black/5' : ''
                      }`}
                    >
                      {stageDeals.map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-3 rounded-lg shadow-sm border border-slate-100 group hover:shadow-md transition-all ${
                                snapshot.isDragging ? 'rotate-2 shadow-lg ring-2 ring-indigo-500 ring-opacity-50' : ''
                              }`}
                              style={provided.draggableProps.style}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${
                                  deal.tags.includes('Urgente') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                                }`}>
                                  {deal.tags[0] || 'General'}
                                </span>
                                <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal size={14} />
                                </button>
                              </div>
                              
                              <h4 className="font-semibold text-slate-800 text-sm mb-1">{deal.title}</h4>
                              <p className="text-xs text-slate-500 mb-3">
                                {state.contacts.find(c => c.id === deal.contactId)?.company || 'Sin Empresa'}
                              </p>

                              <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                  <DollarSign size={12} />
                                  <span className="font-medium text-slate-600">${deal.value.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  <span>{format(new Date(deal.expectedDate), 'dd MMM')}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
