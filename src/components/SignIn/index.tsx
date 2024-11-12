import { ChangeEvent, useCallback, useRef, type FC } from 'react';
import type { ICommonProps } from '@/types';
import component from '@/hoc/component';
import { cls } from '@shirtiny/utils/lib/style';
import Input from '../Input';
import useForm from '@/hooks/useForm';
import logger from '@/utils/logger';
import GlobalContextStore from '@/store/global';
import css from './index.module.scss';
import FormItem from '../FormItem';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import IconWrap from '@/components/Icon';
import Button from '../Button';
import { useImmer } from 'use-immer';
import Timer from '../Timer';

interface IProps extends ICommonProps {}

const controllerOptions = [
  {
    name: 'phone',
    filedPath: 'phone',
    valueName: 'value',
    handler: (e: ChangeEvent<HTMLInputElement>) => ({
      value: e.target.value,
    }),
    validators: [
      ({ v }: any) => ({
        name: 'phoneValid',
        pass: /^1[3-9]\d{9}$/.test(v),
      }),
    ],
  },
  // {
  //   name: "usage",
  //   filedPath: "usage",
  //   eventName: "onClicked",
  //   handler: ({ checked }) => {
  //     return { value: checked ? 3 : 1 };
  //   },
  //   valueName: "checked",
  //   valueHandle: (v) => v === 3,
  // },
];

const SignIn: FC<IProps> = ({ className, style = {}, ...rest }) => {
  const [state, update] = useImmer({ waiting: false });

  const {
    controllers,
    formState: { validates },
    submitFormValues,
    isPass,
  } = useForm({
    defaultValues: {
      phone: '',
      code: '',
    },
    controllerOptions,
    valueControl: true,
  });

  const handleSubmit = () => {
    update((s) => {
      s.waiting = true;
    });
  };

  const handleTimerStop = useCallback(() => {
    update((s) => {
      s.waiting = false;
    });
  }, [update]);

  const { t } = GlobalContextStore.use();

  const sign = (
    <div className={css.form}>
      <FormItem
        errorMsg={
          validates.phone &&
          !validates.phone.phoneValid.pass &&
          t('PHONE_NUMBER_INVALID')
        }
      >
        <Input
          className={css.input}
          type="tel"
          placeholder={t('PHONE_NUMBER_PLACEHOLDER')}
          {...controllers.phone}
        />
      </FormItem>
      {!!isPass(['phone']) && (
        <Button
          className={css.submit}
          theme="primary"
          withIcon
          title={t('SEND')}
          onClick={handleSubmit}
        >
          <IconWrap Icon={HiOutlinePaperAirplane} />
        </Button>
      )}
    </div>
  );

  const verify = (
    <div className={css.form}>
      <Input
        className={css.input}
        type="text"
        inputMode="numeric"
        pattern="\d{1}"
        autocomplete="one-time-code"
      />
      <Timer start={10} end={0} onStop={handleTimerStop} />
    </div>
  );

  return (
    <div
      className={cls(css.signIn, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <div className={css.title}>{t('SIGN_IN_PLEASE')}</div>
      {state.waiting ? verify : sign}
    </div>
  );
};

export default component<IProps>(SignIn);
