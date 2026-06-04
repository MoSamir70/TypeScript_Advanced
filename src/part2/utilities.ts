export function getProperty< T, K extends keyof T>(obj: T,key: K): T[K] 
{
  return obj[key];
}



export function groupBy< T,K extends keyof T>( items: T[], key: K): Record<string, T[]> 
{
  const result: Record<string, T[]> = {};

  for (const item of items) {
    const groupKey = String(item[key]);

    if (!result[groupKey]) { result[groupKey] = []; }

    result[groupKey].push(item);
  }

  return result;
}