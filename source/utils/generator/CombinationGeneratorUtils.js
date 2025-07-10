class CombinationGeneratorUtils
{
    /**
     * Generate all valid combinations of a given length from items,
     * where no two items start with the same letter.
     * @param {string[]} items - Array like ['A1', 'B1', 'B2', 'C1']
     * @param {number} combinationLength
     * @returns {string[][]} Array of valid combinations
     */
    generateUniquePrefixCombinations(items, combinationLength)
     {
        const results = [];

        const backtrack = (start, current, usedPrefixes) =>
        {
            if (current.length === combinationLength)
            {
                results.push([...current]);
                return;
            }

            for (let i = start; i < items.length; i++)
            {
                const item = items[i];
                const prefix = item[0];
                if (usedPrefixes.has(prefix)) continue;

                current.push(item);
                usedPrefixes.add(prefix);

                backtrack(i + 1, current, usedPrefixes);

                current.pop();
                usedPrefixes.delete(prefix);
            }
        };

        backtrack(0, [], new Set());

        return results;
     }
}

export default new CombinationGeneratorUtils();
