import { useState } from 'react';
import { useSubmissionsStore } from '@/lib/store/submissions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Archive, CheckCircle, Clock, Trash2 } from 'lucide-react';

export function FormSubmissions() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'processed' | 'archived'>('all');
  const submissions = useSubmissionsStore((state) => state.getSubmissions());
  const updateStatus = useSubmissionsStore((state) => state.updateStatus);
  const deleteSubmission = useSubmissionsStore((state) => state.deleteSubmission);

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === 'all') return true;
    return submission.status === filter;
  });

  const handleUpdateStatus = (id: string, status: 'pending' | 'processed' | 'archived') => {
    updateStatus(id, status);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Respuestas de Formularios</h2>
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="processed">Procesados</SelectItem>
            <SelectItem value="archived">Archivados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {submission.status === 'pending' && (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  {submission.status === 'processed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {submission.status === 'archived' && (
                    <Archive className="h-5 w-5 text-gray-500" />
                  )}
                  <p className="text-sm text-gray-500">
                    Enviado el {format(new Date(submission.submittedAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                
                <div className="grid gap-2">
                  {Object.entries(submission.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}: </span>
                      <span>{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {submission.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(submission.id, 'processed')}
                  >
                    Marcar como procesado
                  </Button>
                )}
                {submission.status !== 'archived' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(submission.id, 'archived')}
                  >
                    Archivar
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteSubmission(submission.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay respuestas para mostrar
          </div>
        )}
      </div>
    </div>
  );
}