import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
export interface PostedBy {
	id?: string;
	userName: string;
	userId: string;
	photo: string | null;
	postedDate: Date;
}

export interface Reply {
	reply: string;
	postedBy: PostedBy;
}

export interface Comment {
	comment: string;
	postedBy: PostedBy;
	likes: number;
	dislikes: number;
	replies: Reply[];
}
