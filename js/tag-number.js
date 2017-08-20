/**
 * Generates a tag number
 * @arg {number} category Type of tag (game, genre, theme etc)
 * @arg {number} id The ID number of the entity.
 * @returns {number} A tag number
 */
export default (category, id) => {
    if (!category || !id) {
        throw new Error('Both category and ID must be present to generate a tag number');
    }
    category <<= 28;
    return category | id;
};
