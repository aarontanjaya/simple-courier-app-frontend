import React from 'react';
import FormProfile from '../FormProfile/FormProfile';
type ProfileContentProps = React.ComponentProps<'div'>;
export default function ProfileContent({ ...props }: ProfileContentProps) {
  return (
    <div {...props}>
      <FormProfile />
    </div>
  );
}
