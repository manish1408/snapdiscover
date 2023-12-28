import React, { useEffect, useState } from 'react';
import Wrapper from '@/shared/components/wrapper';
import HeaderWithIcon from '@/shared/components/headerBack';
import FilterStarReview from '@/modules/private/detailPlant/components/filterStarReview';

import Review from '@/modules/private/detailProduct/components/review';
import { normalize } from '@/shared/helpers';
import { Image, Linking, Platform, ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AddCommentSection from '../../components/addCommentSection';
import { useRoute } from '@react-navigation/native';
import OverlayLoader from '@/shared/components/overlayLoader';
import { Comment, PostedBy } from '@/shared/interfaces/comments-interface';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../../components/header';
import ReviewHeader from '../../components/reviewHeader';
import { useUser } from '@/shared/hooks/userContext';
export default function Reviews() {
	const route = useRoute();

	const { productId } = route?.params;
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { user } = useUser();
	useEffect(() => {
		fetchComments();
	}, [productId]);

	const fetchComments = async () => {
		try {
			setLoading(true);
			const productDoc = await firestore().collection('products').doc(productId).get();
			const commentIds = productDoc.data()?.userComments || [];

			const commentsData = await Promise.all(
				commentIds.map(async (commentId: string) => {
					const commentDoc = await firestore().collection('comments').doc(commentId).get();
					return { id: commentId, ...commentDoc.data() };
				}),
			);
			setComments(commentsData);
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setLoading(false);
		}
	};
	const handleAddComment = async (comment) => {
		try {
			const postedBy: PostedBy = {
				userName: user?.fullName || '',
				userId: user?.uid || '',
				photo: user?.photoURL || null,
				postedDate: firestore.FieldValue.serverTimestamp(),
			};

			const commentData: Comment = {
				comment: comment,
				postedBy,
				likes: 0,
				dislikes: 0,
				replies: [],
			};
			console.log(commentData);
			const commentRef = await firestore().collection('comments').add(commentData);

			const commentId = commentRef.id;

			await firestore()
				.collection('products')
				.doc(productId)
				.update({
					userComments: firestore.FieldValue.arrayUnion(commentId),
				});
			fetchComments();
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	};
	if (loading) {
		return <OverlayLoader />;
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ height: '100%', flex: 1 }}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : normalize(22)}
			>
				<ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: normalize(24) }}>
					<ReviewHeader title="Comments" />
					{/* <FilterStarReview /> */}
					<View style={{ marginVertical: normalize(16) }} />
					{comments && comments.length > 0 && comments.map((comment) => <Review key={comment.id} comment={comment} />)}
				</ScrollView>
				<AddCommentSection productId={productId} onAddComment={handleAddComment} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
