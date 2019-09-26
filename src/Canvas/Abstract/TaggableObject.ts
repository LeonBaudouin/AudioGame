export abstract class TaggableObject {
    
    private static tagMap: Map<string, TaggableObject[]> = new Map() 
    private tags: string[]

    constructor(tags: string[]) {
        this.tags = tags
        this.addToTagMap()
    }

    private addToTagMap() {
        this.tags.forEach(tag => {
            if (TaggableObject.tagMap.has(tag)) {
                TaggableObject.tagMap.get(tag).push(this)
            } else {
                TaggableObject.tagMap.set(tag, [this])
            }
        });
    }

    public getTags() {
        return this.tags
    }

    public static getByTag(tag: string) {
        if (TaggableObject.tagMap.has(tag)) {
            return TaggableObject.tagMap.get(tag)
        }
        return []
    }
}