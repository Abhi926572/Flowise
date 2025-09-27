import { INode, INodeData, INodeParams } from '../../../src/Interface';

class KeywordExtractorNode implements INode {
    label = 'Keyword Extractor';
    name = 'keywordExtractor';
    type = 'Node';
    icon = 'fa-key';
    category = 'Text Processing';
    description = 'Extracts keywords from input text';
    baseClasses = [this.type];
    inputs = [
        {
            label: 'Input Text',
            name: 'text',
            type: 'string',
            placeholder: 'Enter text here...'
        }
    ];

    async init(nodeData: INodeData): Promise<any> {
        const text = nodeData.inputs?.text as string;
        if (!text) return 'No text provided';

        const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
        const freq: Record<string, number> = {};
        words.forEach(w => (freq[w] = (freq[w] || 0) + 1));

        const keywords = Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);

        return { keywords };
    }
}

module.exports = { nodeClass: KeywordExtractorNode };
