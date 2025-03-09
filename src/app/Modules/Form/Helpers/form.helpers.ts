// ✅ Formatea la fecha en "YYYY-MM-DD" (necesario para <input type="date">)
export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
}