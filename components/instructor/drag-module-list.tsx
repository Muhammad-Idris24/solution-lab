'use client';

import { DragEvent } from 'react';
import { GripVertical } from 'lucide-react';
import { LessonModule } from '@/data/instructor-dashboard';

interface Props {
  modules: LessonModule[];
  onReorder: (modules: LessonModule[]) => void;
}

export const DragModuleList = ({ modules, onReorder }: Props) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, id: string) => {
    event.dataTransfer.setData('moduleId', id);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>, targetId: string) => {
    const draggedId = event.dataTransfer.getData('moduleId');
    if (!draggedId || draggedId === targetId) return;

    const items = [...modules];
    const dragIndex = items.findIndex((entry) => entry.id === draggedId);
    const dropIndex = items.findIndex((entry) => entry.id === targetId);
    if (dragIndex < 0 || dropIndex < 0) return;

    const [dragged] = items.splice(dragIndex, 1);
    items.splice(dropIndex, 0, dragged);
    onReorder(items);
  };

  return (
    <div className="space-y-2">
      {modules.map((module, index) => (
        <div
          key={module.id}
          draggable
          onDragStart={(event) => onDragStart(event, module.id)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => onDrop(event, module.id)}
          className="flex cursor-move items-center justify-between rounded-lg border border-slate-100 p-3"
        >
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-slate-400" />
            <div>
              <p className="font-semibold text-slate-900">{index + 1}. {module.title}</p>
              <p className="text-xs text-slate-500">{module.type} • {module.duration}</p>
            </div>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">Drag</span>
        </div>
      ))}
    </div>
  );
};
