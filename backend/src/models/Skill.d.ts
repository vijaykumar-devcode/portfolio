import mongoose from 'mongoose';
declare const Skill: mongoose.Model<{
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    category: string;
    icon: string;
    color: string;
    items: string[];
    isVisible: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Skill;
//# sourceMappingURL=Skill.d.ts.map