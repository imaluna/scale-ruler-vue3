import { computed, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import type { AnyRecord, ContainerInfo, RequiredScaleRulerOpt } from '@/type';

export const useContainer = (
  opt: Ref<RequiredScaleRulerOpt>,
  container: Ref
) => {
  const rect = reactive<AnyRecord>({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });

  function onContainerResize(
    opt: Ref<RequiredScaleRulerOpt>,
    node: HTMLElement
  ) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === node) {
          const width = node.offsetWidth;
          const height = node.offsetHeight;
          if (width !== rect.originWidth || height !== rect.originHeight) {
            initContainer(opt, node);
          }
        }
      }
    });
    resizeObserver.observe(node);
  }
  function initContainer(
    opt: Ref<RequiredScaleRulerOpt>,
    node: HTMLElement,
    resize: boolean = false
  ) {
    const _opt = opt.value;
    if (_opt.containerAutoSize) {
      rect.width = node.offsetWidth;
      rect.height = node.offsetHeight;
      rect.originWidth = rect.width;
      rect.originHeight = rect.height;
      if (resize) {
        onContainerResize(opt, node);
      }
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
  onMounted(() => {
    const node = container.value as HTMLElement;
    if (node) {
      initContainer(opt, node, true);
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
    containerInfo,
    containerStyle
  };
};
