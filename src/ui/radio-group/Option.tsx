import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';

import { OptionType } from 'src/constants/articleProps';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	option: OptionType;
	name: string;
	selected: OptionType;
	onChange?: (option: OptionType) => void;
};

export const Option: FC<OptionProps> = ({
	option,
	name,
	selected,
	onChange,
}) => {
	const { value, title } = option;
	const isChecked = value === selected.value;

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		if (evt.target.checked && onChange) {
			onChange(option);
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
			<span className={styles.label}>{title}</span>
		</label>
	);
};
