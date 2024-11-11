import { ChangeEvent, useRef, type FC } from 'react';
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

  const { t } = GlobalContextStore.use();

  return (
    <div
      className={cls(css.signIn, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <div className={css.title}>{t('SIGN_IN_PLEASE')}</div>
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
          >
            <IconWrap Icon={HiOutlinePaperAirplane} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default component<IProps>(SignIn);
