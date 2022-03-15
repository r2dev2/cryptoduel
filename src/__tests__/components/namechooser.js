import { render, fireEvent } from '@testing-library/svelte';
import { NameChooser } from '@/components';

describe('<NameChooser />', () => {
  it('prompts for username', () => {
    const { getByText} = render(NameChooser, {});
    expect(getByText('Username')).toBeInTheDocument();
  });
});
