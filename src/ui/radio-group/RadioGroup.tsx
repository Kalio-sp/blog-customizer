import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Option } from './Option';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (value: OptionType) => void;
	title: string;
};

export const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, selected, onChange, title } = props;

	return (
		<div className={styles.container}>
			{title && (
				<Text weight={800} size={12} uppercase>
					{title}
				</Text>
			)}

			<div className={styles.group}>
				{options.map((option) => (
					<Option
						key={option.value}
						name={name}
						option={option}
						selected={selected}
						onChange={onChange}
					/>
				))}
			</div>
		</div>
	);
};
