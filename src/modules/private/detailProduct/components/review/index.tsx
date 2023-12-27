import React from 'react';
import { Image, View } from 'react-native';
import Typography from '@/shared/components/typography';
import { styles } from './styles';
import Icon from '@/shared/components/icon';
import { star } from '@/shared/assets/icons';
import { like, dislike } from '@/shared/assets/icons-8';
import { normalize } from '@/shared/helpers';
import moment from 'moment';

export default function Review({ comment }) {
	console.log(comment);
	return (
		<View style={{ marginBottom: normalize(24) }}>
			<View style={styles.header}>
				<View style={styles.row}>
					<Image style={styles.avatar} source={{ uri: 'https://i.ibb.co/hZqwx78/049-girl-25.png' }} />

					<View>
						<Typography style={styles.name} translate={false}>
							{comment.userName}
						</Typography>
						<Typography style={styles.date} translate={false}>
							{moment(comment.postedDate?.toDate()).fromNow()}
						</Typography>
					</View>
				</View>

				{/* <View>
					<View style={styles.valueReview}>
						<Icon icon={star} />
						<Typography style={styles.textReview}>5.0</Typography>
					</View>
				</View> */}
			</View>

			<View style={{ marginTop: normalize(12) }}>
				<Typography style={styles.description} translate={false}>
					{comment.comment}
				</Typography>
			</View>

			<View style={styles.row}>
				<View style={styles.row}>
					<Icon icon={like} />
					<Typography style={styles.valueLike} translate={false}>
						{comment.likes}
					</Typography>
				</View>
				<View style={{ width: 10 }} />
				<View style={styles.row}>
					<Icon icon={dislike} />
					<Typography style={styles.valueLike} translate={false}>
						{comment.dislikes}
					</Typography>
				</View>
			</View>
		</View>
	);
}
