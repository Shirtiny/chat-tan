import { ChangeEvent, useCallback, type FC } from 'react';
import type { ICommonProps } from '@/types';
import component from '@/hoc/component';
import { cls } from '@shirtiny/utils/lib/style';
import css from './index.module.scss';
import TextArea from '@/components/TextArea';
import GlobalContextStore from '@/store/global';
import { useImmer } from 'use-immer';
import Button from '@/components/Button';
import { HiPaperAirplane } from 'react-icons/hi2';
import IconWrap from '@/components/Icon';

interface IProps extends ICommonProps {
  onSubmit?(v: string): void;
}

const InputArea: FC<IProps> = ({
  className,
  style = {},
  onSubmit,
  ...rest
}) => {
  const { t } = GlobalContextStore.use();

  const [state, update] = useImmer({
    v: '',
    focus: false,
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      update((s) => {
        s.v = e.target.value;
      });
    },
    [],
  );

  const handleFocusChange = useCallback((focus?: boolean) => {
    update((s) => {
      s.focus = !!focus;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit?.(state.v);

    update((s) => {
      s.v = '';
    });
  }, [state.v]);

  return (
    <div
      className={cls(css.inputArea, state.focus && css.focus)}
      style={style}
      {...rest}
    >
      <TextArea
        value={state.v}
        onChange={handleInputChange}
        onFocusChange={handleFocusChange}
        className={css.textarea}
        placeholder={t('CHAT_INPUT_PLACEHOLDER')}
        // resize="vertical"
        wrap="off"
        autoComplete="off"
        minHeight={50}
        maxLength={2000}
        autoSize
        borderless
      />
      <div className={css.bar}>
        <div className="flex-space"></div>
        <Button type="text" onClick={handleSubmit} withIcon>
          <IconWrap Icon={HiPaperAirplane} />
        </Button>
      </div>
    </div>
  );
};

export default component<IProps>(InputArea);
