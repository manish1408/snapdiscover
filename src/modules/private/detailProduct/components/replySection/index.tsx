import React from 'react';
import { Image, View } from 'react-native';
import Typography from '@/shared/components/typography';
import { styles } from './styles';

import { normalize } from '@/shared/helpers';
import moment from 'moment';

export default function ReplySection({ replyText }) {
	console.log('Hello', replyText);

	return (
		<>
			<View style={{ marginBottom: normalize(10), paddingHorizontal: normalize(24) }}>
				<View style={styles.header}>
					<View style={styles.row}>
						<Image
							style={styles.avatar}
							source={{ uri: replyText?.postedBy?.photo ? replyText?.postedBy?.photo : 'https://i.ibb.co/hZqwx78/049-girl-25.png' }}
						/>

						<View>
							<Typography style={styles.name} translate={false}>
								{replyText.postedBy?.userName}
							</Typography>
							<Typography style={styles.date} translate={false}>
								{moment(replyText.postedDate?.toDate()).fromNow()}
							</Typography>
						</View>
					</View>
				</View>

				<View style={{ marginTop: normalize(12) }}>
					<Typography style={styles.description} translate={false}>
						{replyText.reply}
					</Typography>
				</View>
			</View>
		</>
	);
}
