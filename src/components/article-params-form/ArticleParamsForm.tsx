import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	ArticleStateType,
	contentWidthArr,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
// Стили компонентов
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
// import { StoryDecorator } from 'src/ui/story-decorator';
import { Separator } from 'src/ui/separator';

export type ArticleStateTypeProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleStateTypeProps) => {
	// Хранение состояний формы
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [fontFamily, setFontFamilyOption] = useState(
		articleState.fontFamilyOption
	);
	const [fontSize, setFontSizeOption] = useState(articleState.fontSizeOption);
	// const [fontFamilyClass, setFontFamilyClass] = useState(
	// 	articleState.fontFamilyClass
	// );
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	// Логика применения изменений
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState({
			...articleState,
			backgroundColor,
			fontColor,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			contentWidth,
		});
	};

	// Логика сброса изменений
	const handleReset = () => {
		setArticleState(defaultArticleState);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setFontColor(defaultArticleState.fontColor);
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setContentWidth(defaultArticleState.contentWidth);
	};

	// Откртие и зайкрытие сайдбара
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	// Клик вне сайдбара
	useEffect(() => {
		const clickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		// Закрытие сайдбара по нажатию на клавишу
		const escapeClose = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', clickOutside);
		document.addEventListener('keydown', escapeClose);

		return () => {
			document.removeEventListener('mousedown', clickOutside);
			document.removeEventListener('keydown', escapeClose);
		};
	}, [isOpen]);
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFontFamilyOption}
					/>
					<RadioGroup
						name='fonts-size'
						selected={fontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={setFontSizeOption}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет Фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
