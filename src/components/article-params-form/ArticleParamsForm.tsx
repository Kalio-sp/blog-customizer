import { FormEvent, useEffect, useRef, useState } from 'react';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (!formRef.current?.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onReset(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<div ref={formRef}>
				<aside
					className={clsx(
						styles.container,
						isSidebarOpen && styles.container_open
					)}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>

						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
							}
						/>

						<RadioGroup
							name='font-size'
							title='Размер шрифта'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontSizeOption: option }))
							}
						/>

						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontColor: option }))
							}
						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, backgroundColor: option }))
							}
						/>

						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, contentWidth: option }))
							}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
