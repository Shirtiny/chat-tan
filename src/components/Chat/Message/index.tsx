import { FC, memo } from 'react';
import type { ICommonProps, Roles } from '@/types';
import component from '@/hoc/component';
import { cls } from '@shirtiny/utils/lib/style';
import * as Prompts from '@/components/_Prompts';
import Avatar from '@/components/Avatar';
import { HiOutlineCommandLine, HiOutlineUserCircle } from 'react-icons/hi2';

import { lang } from '@shirtiny/utils';
import render, { Component } from '@/utils/render';
import css from './index.module.scss';
import IconWrap from '@/components/Icon';

interface IProps extends ICommonProps {
  role: Roles;
  content?: string | Component;
}

const ChatMessage: FC<IProps> = ({ className, style, role, content }) => {
  const isUser = role === 'user';
  return (
    <div
      className={cls(css.message, className, css[`role-${role}`])}
      style={style}
    >
      <div className={css.side}>
        {isUser ? (
          <Avatar Icon={<IconWrap Icon={HiOutlineUserCircle} />} />
        ) : (
          <Avatar Icon={<IconWrap Icon={HiOutlineCommandLine} />} />
        )}
        <div className="flex-space"></div>
      </div>
      <div className={css.content}>
        {lang.isText(content) ? content : render(Prompts, content)}
      </div>
    </div>
  );
};

export default component<IProps>(ChatMessage);
