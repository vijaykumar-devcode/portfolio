import type { Request, Response, NextFunction } from 'express';
export declare const getMessages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateMessageStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=messageController.d.ts.map