const CATEGORIES = ["UX", "Frontend", "Backend"]; 

export function FilterSortControls({ teamMembers, activeFilters, sortCriteria, onFilterChange, onSortChange }) {
  
  const handleCategoryFilter = (e) => {
    onFilterChange(prev => ({ ...prev, category: e.target.value }));
  };

  const handleMemberFilter = (e) => {
    // Notera: Detta filter appliceras logiskt i app.jsx-filens useMemo
    // och är främst tänkt för "in progress" uppgifter enligt beskrivningen.
    // Här sätts bara värden, app.jsx hanterar logiken.
    onFilterChange(prev => ({ ...prev, memberId: e.target.value }));
  };

  const handleSortFieldChange = (e) => {
    onSortChange(prev => ({ ...prev, field: e.target.value }));
  };

  const handleSortOrderChange = (e) => {
    onSortChange(prev => ({ ...prev, order: e.target.value }));
  };


  return (
    <div className="filter-sort-controls">
      <h3>Filter & Sortering</h3>
      <div>
        <label>Filtrera på Kategori: </label>
        <select value={activeFilters.category} onChange={handleCategoryFilter}>
          <option value="">Alla kategorier</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div>
        <label>Filtrera på Medlem (för In Progress): </label>
        <select value={activeFilters.memberId} onChange={handleMemberFilter}>
          <option value="">Alla medlemmar</option>
          {teamMembers.map(member => <option key={member.id} value={member.id}>{member.name} ({member.role})</option>)}
        </select>
      </div>
      <div>
        <label>Sortera på: </label>
        <select value={sortCriteria.field} onChange={handleSortFieldChange}>
          <option value="timestamp">Timestamp</option>
          <option value="title">Titel</option>
        </select>
        <select value={sortCriteria.order} onChange={handleSortOrderChange}>
          <option value="desc">Fallande (Nyast/Ö-A)</option>
          <option value="asc">Stigande (Äldst/A-Ö)</option>
        </select>
      </div>
    </div>
  );
}

