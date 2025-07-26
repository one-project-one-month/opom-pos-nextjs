export type StaffList = {
    id: number;
    name: string;
    role_id: number;
    email: string;
    suspended: number;
    photo: string | null;
    comfirmed_at: string | null;
    created_at: string;
    updated_at: string;
    role: {
        id: number;
        name: string;
        guard_name: string;
        created_at: string;
        updated_at: string;
    };
}