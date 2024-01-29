export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          details: string
          id: number
          name: string
          phone: string
          state: string
          user_id: string
        }
        Insert: {
          city: string
          created_at?: string
          details: string
          id?: number
          name: string
          phone: string
          state: string
          user_id: string
        }
        Update: {
          city?: string
          created_at?: string
          details?: string
          id?: number
          name?: string
          phone?: string
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
          poster_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          brand: string
          created_at: string
          id: number
          name: string
          price: number
          user_id: string
        }
        Insert: {
          brand: string
          created_at?: string
          id?: number
          name: string
          price: number
          user_id: string
        }
        Update: {
          brand?: string
          created_at?: string
          id?: number
          name?: string
          price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand: string
          category: number
          colors: string[]
          created_at: string
          description: string
          id: number
          images: string[]
          name: string
          price: number
          rating: number
          size: Database["public"]["Enums"]["sizes"][]
        }
        Insert: {
          brand: string
          category: number
          colors: string[]
          created_at?: string
          description: string
          id?: number
          images: string[]
          name: string
          price: number
          rating: number
          size: Database["public"]["Enums"]["sizes"][]
        }
        Update: {
          brand?: string
          category?: number
          colors?: string[]
          created_at?: string
          description?: string
          id?: number
          images?: string[]
          name?: string
          price?: number
          rating?: number
          size?: Database["public"]["Enums"]["sizes"][]
        }
        Relationships: [
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          address: string
          avatar_url: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          address: string
          avatar_url?: string | null
          id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          avatar_url?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subcategories: {
        Row: {
          category: number
          created_at: string
          id: number
          name: string | null
          poster_url: string | null
        }
        Insert: {
          category: number
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Update: {
          category?: number
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      sizes: "S" | "M" | "L" | "XL" | "XXL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
