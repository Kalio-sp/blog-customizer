import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	option: OptionType;
	name: string;
	selected: OptionType;
	onChange?: (option: OptionType) => void;
};

export const Option = ({ option, name, selected, onChange }: OptionProps) => {
	const { value, title } = option;
	const isChecked = value === selected.value;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			onChange?.(option);
		}
	};

	return (
		<label className={clsx(styles.option, isChecked && styles.optionChecked)}>
			<input
				className={styles.input}
				type='radio'
				name={name}
				value={value}
				checked={isChecked}
				onChange={handleChange}
			/>
			<span className={styles.label}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</span>
		</label>
	);
};
