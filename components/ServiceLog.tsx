
import React, { useState, useEffect } from 'react';
import { Address, ChecklistItem, ServiceLogData } from '../types';
import { POOL_SERVICE_CHECKLIST } from '../constants';
import { Button } from './Button';
import { IconCamera, IconNotes, IconChecklist, IconSave } from './Icons';

interface ServiceLogProps {
  address: Address;
  onSave: (log: ServiceLogData) => void;
  initialLog?: ServiceLogData;
}

export const ServiceLog: React.FC<ServiceLogProps> = ({ address, onSave, initialLog }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    initialLog?.checklist || POOL_SERVICE_CHECKLIST.map(item => ({...item, completed: false}))
  );
  const [notes, setNotes] = useState(initialLog?.notes || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string | null>(initialLog?.photoFileName || null);

  useEffect(() => {
    // Reset state if the address prop changes
    setChecklist(initialLog?.checklist || POOL_SERVICE_CHECKLIST.map(item => ({...item, completed: false})));
    setNotes(initialLog?.notes || '');
    setPhotoFile(null);
    setPhotoFileName(initialLog?.photoFileName || null);
  }, [address, initialLog]);

  const handleChecklistChange = (id: string) => {
    setChecklist(
      checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
      setPhotoFileName(e.target.files[0].name);
    }
  };

  const handleSave = () => {
    const logData: ServiceLogData = {
      checklist,
      notes,
      photoFileName,
      timestamp: new Date().toISOString(),
    };
    onSave(logData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Service Log for: <span className="text-brand-blue">{address.name}</span></h3>
        <p className="text-sm text-gray-500">{address.address}</p>
      </div>
      <div className="p-4 space-y-6">
        {/* Checklist */}
        <div>
          <h4 className="font-semibold text-gray-700 flex items-center space-x-2"><IconChecklist /><span>Service Checklist</span></h4>
          <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-2">
            {checklist.map(item => (
              <label key={item.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleChecklistChange(item.id)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue-light focus:ring-brand-blue"
                />
                <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="font-semibold text-gray-700 flex items-center space-x-2"><IconNotes /><span>Notes</span></h4>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
            placeholder="Add any service notes here..."
          />
        </div>

        {/* Photo Proof */}
        <div>
          <h4 className="font-semibold text-gray-700 flex items-center space-x-2"><IconCamera /><span>Proof of Service</span></h4>
          <div className="mt-2 flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                 {photoFileName ? (
                     <p className="text-sm text-green-600 font-semibold px-2">{photoFileName}</p>
                 ) : (
                    <>
                    <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p className="text-xs text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    </>
                 )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <IconSave />
            Save Service Log
          </Button>
        </div>
      </div>
    </div>
  );
};
