/**
 * Generates a tag number
 * @param category Type of tag (game, genre, theme etc)
 * @param id The ID number of the entity.
 * @returns A tag number
 */
export default function getTagNumber(category: number, id: number): number {
    if (!category || !id) {
        throw new Error('Both category and ID must be present to generate a tag number');
    }
    category <<= 28;
    return category | id;
}