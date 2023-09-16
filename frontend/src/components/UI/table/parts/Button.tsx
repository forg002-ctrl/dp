import { classNames } from 'components/UI/table/parts/Utils';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  rest?: any;
  onClick(): void;
} 

export function Button(props: ButtonProps) {
  function handleClick(): void {
    props.onClick();
  }
  
  return (
    <button
      type="button"
      disabled={props.disabled}
      className={
        classNames(
          "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          props.className
        )
      }
      onClick={handleClick}
      {...props.rest}
    >
      {props.children}
    </button>
  )
}

export function PageButton(props: ButtonProps) {
  function handleClick(): void {
    props.onClick();
  }

  return (
    <button
      type="button"
      disabled={props.disabled}
      className={
        classNames(
          "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
          props.className
        )}
      onClick={handleClick}
      {...props.rest}
    >
      {props.children}
    </button>
  )
}
