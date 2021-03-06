import { Story, Meta } from '@storybook/react'
import { HeartOutlineIcon } from 'components/Icons'
import Button, { ButtonProps } from '.'

export default {
  title: 'Button',
  component: Button
} as Meta

export const Default: Story<ButtonProps> = (args) => (
  <Button {...args}>{args.children}</Button>
)

export const Outline: Story<ButtonProps> = (args) => (
  <Button {...args}>{args.children}</Button>
)

export const Minimal: Story<ButtonProps> = (args) => (
  <Button {...args}>{args.children}</Button>
)

Default.args = {
  minimal: false,
  children: 'Enviar'
}

Outline.args = {
  icon: <HeartOutlineIcon />,
  outline: true,
  children: 'curtir capitulo'
}

Minimal.args = {
  icon: <HeartOutlineIcon />,
  minimal: true,
  children: 'curtir capitulo'
}
