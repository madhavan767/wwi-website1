import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Layers } from 'lucide-react';
import { api } from '../../services/api';

export function AdminCareerEditorPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote (India)',
    employment_type: 'Full-Time',
    experience: '0-2 Yrs',
    salary: 'Competitive',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    custom_fields: [],
    status: 'draft'
  });

  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldOptions, setNewFieldOptions] = useState('');
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchCareerDetails();
    }
  }, [id]);

  const fetchCareerDetails = async () => {
    try {
      const res = await api.getAdminCareerById(id);
      if (res.data) {
        setFormState({
          ...res.data,
          responsibilities: Array.isArray(res.data.responsibilities) ? res.data.responsibilities.join('\n') : res.data.responsibilities || '',
          requirements: Array.isArray(res.data.requirements) ? res.data.requirements.join('\n') : res.data.requirements || '',
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills || '',
          custom_fields: res.data.custom_fields || []
        });
      }
    } catch (err) {
      setError('Failed to load career position for editing.');
    }
  };

  const handleAddCustomField = () => {
    if (!newFieldLabel.trim()) return;
    const newField = {
      id: `cf_${Date.now()}`,
      label: newFieldLabel.trim(),
      type: newFieldType,
      options: newFieldType === 'dropdown' ? newFieldOptions.split(',').map(s => s.trim()).filter(Boolean) : [],
      required: newFieldRequired
    };
    setFormState(prev => ({
      ...prev,
      custom_fields: [...prev.custom_fields, newField]
    }));
    setNewFieldLabel('');
    setNewFieldOptions('');
    setNewFieldRequired(false);
  };

  const handleRemoveCustomField = (fieldId) => {
    setFormState(prev => ({
      ...prev,
      custom_fields: prev.custom_fields.filter(f => f.id !== fieldId)
    }));
  };

  const handleSave = async (targetStatus) => {
    if (!formState.title || !formState.department || !formState.description) {
      setError('Title, department, and description are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...formState,
      status: targetStatus || formState.status,
      responsibilities: typeof formState.responsibilities === 'string' ? formState.responsibilities.split('\n').filter(Boolean) : formState.responsibilities,
      requirements: typeof formState.requirements === 'string' ? formState.requirements.split('\n').filter(Boolean) : formState.requirements,
      skills: typeof formState.skills === 'string' ? formState.skills.split(',').map(s => s.trim()).filter(Boolean) : formState.skills,
      custom_fields: formState.custom_fields
    };

    try {
      if (isEditing) {
        await api.updateCareer(id, payload);
      } else {
        await api.createCareer(payload);
      }
      navigate('/v1/admin/careers');
    } catch (err) {
      setError(err.message || 'Failed to save career position.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/v1/admin/careers')}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Careers List
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-5 py-2 bg-white/10 text-white text-xs font-bold rounded-full hover:bg-white/20 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-6 py-2 bg-white text-black text-xs font-extrabold rounded-full hover:bg-gray-200 flex items-center gap-1.5 shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Publish Position
          </button>
        </div>
      </div>

      <div className="bg-[#14161a] border border-white/10 rounded-3xl p-8 space-y-6">
        <h1 className="text-xl font-bold">{isEditing ? 'Edit Career Position & Custom Form Fields' : 'Create New Career Position'}</h1>

        {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">JOB TITLE *</label>
            <input
              type="text"
              required
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              placeholder="e.g. Full Stack Engineer"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">DEPARTMENT *</label>
            <input
              type="text"
              required
              value={formState.department}
              onChange={(e) => setFormState({ ...formState, department: e.target.value })}
              placeholder="Engineering / Product / Content"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">LOCATION</label>
            <input
              type="text"
              value={formState.location}
              onChange={(e) => setFormState({ ...formState, location: e.target.value })}
              placeholder="Remote (India)"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">EMPLOYMENT TYPE</label>
            <input
              type="text"
              value={formState.employment_type}
              onChange={(e) => setFormState({ ...formState, employment_type: e.target.value })}
              placeholder="Full-Time / Contract"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">EXPERIENCE REQUIRED</label>
            <input
              type="text"
              value={formState.experience}
              onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
              placeholder="0-2 Yrs"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">SALARY / STIPEND</label>
          <input
            type="text"
            value={formState.salary}
            onChange={(e) => setFormState({ ...formState, salary: e.target.value })}
            placeholder="Competitive / ₹10,000 - ₹15,000"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">JOB DESCRIPTION *</label>
          <textarea
            rows={3}
            required
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            placeholder="Overview of what the role entails..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">RESPONSIBILITIES (ONE PER LINE)</label>
          <textarea
            rows={4}
            value={formState.responsibilities}
            onChange={(e) => setFormState({ ...formState, responsibilities: e.target.value })}
            placeholder="Curate structured curriculum&#10;Develop frontend components..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">REQUIREMENTS (ONE PER LINE)</label>
          <textarea
            rows={4}
            value={formState.requirements}
            onChange={(e) => setFormState({ ...formState, requirements: e.target.value })}
            placeholder="Proficiency in React and Node.js&#10;Strong communication skills..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">REQUIRED SKILLS (COMMA SEPARATED)</label>
          <input
            type="text"
            value={formState.skills}
            onChange={(e) => setFormState({ ...formState, skills: e.target.value })}
            placeholder="React, Node.js, Express, Tailwind CSS"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
          />
        </div>

        {/* CUSTOM APPLICATION FIELD BUILDER */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Custom Application Form Builder
            </h3>
            <span className="text-[10px] text-gray-400">Add dynamic fields required for candidates applying to this role</span>
          </div>

          {/* Active Custom Fields List */}
          {formState.custom_fields.length > 0 && (
            <div className="space-y-2">
              {formState.custom_fields.map((f) => (
                <div key={f.id} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{f.label}</span>
                    <span className="ml-2 text-[10px] uppercase font-bold text-gray-400">({f.type})</span>
                    {f.required && <span className="ml-2 text-[10px] font-bold text-red-400">Required</span>}
                    {f.options?.length > 0 && <div className="text-[10px] text-gray-400">Options: {f.options.join(', ')}</div>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomField(f.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Custom Field Form */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Field Label / Question</label>
                <input
                  type="text"
                  placeholder="e.g. GitHub Profile Link"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Input Type</label>
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1e2026] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="text">Text Entry</option>
                  <option value="dropdown">Dropdown Options</option>
                  <option value="checkbox">Checkbox (Yes/No)</option>
                  <option value="textarea">Text Area</option>
                </select>
              </div>

              <div className="flex items-center pt-5 gap-3">
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFieldRequired}
                    onChange={(e) => setNewFieldRequired(e.target.checked)}
                    className="w-4 h-4 rounded text-black"
                  />
                  Required
                </label>

                <button
                  type="button"
                  onClick={handleAddCustomField}
                  className="px-4 py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-gray-200 flex items-center gap-1 ml-auto"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Field
                </button>
              </div>
            </div>

            {newFieldType === 'dropdown' && (
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Dropdown Options (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Option 1, Option 2, Option 3"
                  value={newFieldOptions}
                  onChange={(e) => setNewFieldOptions(e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
