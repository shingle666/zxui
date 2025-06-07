<template>
  <view :class="bem()">
    <slot :chunks="highlightChunks" :sourceString="sourceString">
      <!-- Default slot content -->
      <template v-for="(chunk, index) in highlightChunks" :key="index">
        <text
          :class="[chunk.highlight ? [bem('tag'), highlightClass] : unhighlightClass, chunk.highlight ? highlightTag : unhighlightTag]"
        >
          {{ sourceString.slice(chunk.start, chunk.end) }}
        </text>
      </template>
    </slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const COMPONENT_NAME = 'zx-highlight';
const bem = (blockSuffix = '', elementSuffix = '', modifier = '') => {
  let cls = `${COMPONENT_NAME}`;
  if (blockSuffix) cls += `-${blockSuffix}`;
  if (elementSuffix) cls += `__${elementSuffix}`;
  if (modifier) cls += `--${modifier}`;
  return cls;
};

const props = defineProps({
  tag: {
    type: String,
    default: 'view',
  },
  keywords: {
    type: [String, Array],
    required: true,
  },
  sourceString: {
    type: String,
    default: '',
  },
  caseSensitive: {
    type: Boolean,
    default: false,
  },
  autoEscape: {
    type: Boolean,
    default: true, // Default to true to escape regex characters in keywords
  },
  highlightTag: {
    type: String,
    default: 'text',
  },
  highlightClass: {
    type: String,
    default: '',
  },
  unhighlightTag: {
    type: String,
    default: 'text',
  },
  unhighlightClass: {
    type: String,
    default: '',
  },
});

const highlightChunks = computed(() => {
  const { sourceString, keywords, caseSensitive, autoEscape: escapeKeywords } = props;
  if (!sourceString) return [{ start: 0, end: 0, highlight: false }];
  if (!keywords || (Array.isArray(keywords) && keywords.length === 0)) {
    return [{ start: 0, end: sourceString.length, highlight: false }];
  }

  const flags = caseSensitive ? 'g' : 'gi';
  const _keywords = Array.isArray(keywords) ? keywords : [keywords];

  let chunks = _keywords
    .filter(keyword => keyword && String(keyword).trim() !== '') // Ensure keyword is not empty or just whitespace
    .reduce((acc, keywordStr) => {
      let keyword = String(keywordStr);
      if (escapeKeywords) {
        keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex special chars
      }
      if (!keyword) return acc; // Skip if keyword becomes empty after escape (though unlikely with current regex)

      try {
        const regex = new RegExp(keyword, flags);
        let match;
        while ((match = regex.exec(sourceString)) !== null) {
          const start = match.index;
          const end = regex.lastIndex;

          if (start >= end) { // Avoid infinite loops for zero-length matches
            regex.lastIndex++;
            continue;
          }
          acc.push({ start, end, highlight: true });
        }
      } catch (e) {
        // console.error(`Invalid regex for keyword: ${keywordStr}`, e);
      }
      return acc;
    }, []);

  // Sort by start index, then by end index descending (for overlapping ranges)
  chunks.sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return b.end - a.end; // Longer matches first for same start
  });

  // Merge overlapping/adjacent chunks
  const mergedChunks = [];
  if (chunks.length > 0) {
    mergedChunks.push({ ...chunks[0] });
    for (let i = 1; i < chunks.length; i++) {
      const currentChunk = chunks[i];
      const lastMergedChunk = mergedChunks[mergedChunks.length - 1];
      if (currentChunk.start < lastMergedChunk.end) { // Overlap or containment
        lastMergedChunk.end = Math.max(lastMergedChunk.end, currentChunk.end);
      } else {
        mergedChunks.push({ ...currentChunk });
      }
    }
  }

  // Add unhighlighted chunks
  const result = [];
  let lastIndex = 0;
  mergedChunks.forEach(chunk => {
    if (chunk.start > lastIndex) {
      result.push({ start: lastIndex, end: chunk.start, highlight: false });
    }
    result.push(chunk);
    lastIndex = chunk.end;
  });

  if (lastIndex < sourceString.length) {
    result.push({ start: lastIndex, end: sourceString.length, highlight: false });
  }
  
  if (result.length === 0 && sourceString.length > 0) {
      return [{ start: 0, end: sourceString.length, highlight: false }];
  }
  if (result.length === 0 && sourceString.length === 0) {
      return [{ start: 0, end: 0, highlight: false }];
  }

  return result;
});

</script>

<style lang="scss" scoped>
// Define a default highlight color, can be overridden by highlightClass
// Or, users can define --zx-highlight-tag-color in their global styles.
.zx-highlight-tag {
  color: var(--zx-highlight-tag-color, #1989fa); // Default to a blue color if not provided
}
</style>