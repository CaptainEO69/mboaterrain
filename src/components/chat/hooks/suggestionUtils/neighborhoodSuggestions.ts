
/**
 * Generates suggestions based on a mentioned neighborhood
 */
export function generateNeighborhoodSuggestions(lastNeighborhood: string): string[] {
  return [
    `Prix à ${lastNeighborhood}?`,
    `Sécurité à ${lastNeighborhood}?`,
    `Autres quartiers comme ${lastNeighborhood}?`
  ];
}
