import { computed, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import type { AnyRecord, ContainerInfo, RequiredScaleRulerOpt } from '@/type';
const rect = reactive<AnyRecord>({
  width: 0,
  height: 0,
  originWidth: 0,
  originHeight: 0
});

function onContainerResize(node: HTMLElement) {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === node) {
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        if (width !== rect.originWidth || height !== rect.originHeight) {
        }
      }
    }
  });
  resizeObserver.observe(node);
}

export const useContainer = (
  opt: Ref<RequiredScaleRulerOpt>,
  container: Ref
) => {
  onMounted(() => {
    const _opt = opt.value;
    const node = container.value as HTMLElement;
    if (node) {
      if (_opt.containerAutoSize) {
        rect.width = node.offsetWidth;
        rect.height = node.offsetHeight;
        rect.originWidth = rect.width;
        rect.originHeight = rect.height;
        onContainerResize(node);
      } else {
        rect.width = _opt.containerWidth;
        rect.height = _opt.containerHeight;
      }
      const styles = getComputedStyle(node);
      if (styles.boxSizing === 'border-box') {
        rect.width -=
          parseFloat(styles.borderLeftWidth) +
          parseFloat(styles.borderRightWidth);
        rect.height -=
          parseFloat(styles.borderTopWidth) +
          parseFloat(styles.borderBottomWidth);
      }
      if (styles.position === 'static') {
        rect.position = 'relative';
      }
    }
  });
  const containerInfo = computed((): ContainerInfo => {
    return {
      width: rect.width,
      height: rect.height
    };
  });
  const containerStyle = computed((): AnyRecord => {
    const _opt = opt.value;
    const res: AnyRecord = {
      overflow: 'hidden'
    };
    if (!_opt.containerAutoSize) {
      res.width = rect.width + 'px';
      res.height = rect.height + 'px';
    }
    if (rect.position) {
      res.position = rect.position;
    }
    return res;
  });
  return {
    containerInfo, containerStyle
  }
};
