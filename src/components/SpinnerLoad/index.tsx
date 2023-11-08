import { HTMLAttributes } from 'react';

import './styles.css';

interface ILoadProps {
	divProps: HTMLAttributes<HTMLDivElement>;
}

const SpinnerLoad = (props: ILoadProps) => {
	return (
		<>
			<div className={"containerLoad"} {...props.divProps}>
				<div className={"spinner"}>
				</div>
			</div>
		</>
	);
};

export default SpinnerLoad;