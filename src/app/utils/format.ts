export function formatLabel(value: string): string {
  return value.replace(/_/g, ' ');
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function caseId(id: number): string {
  return `BGV-${String(id).padStart(5, '0')}`;
}
