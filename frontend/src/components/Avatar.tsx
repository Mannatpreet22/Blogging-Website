interface AvatarProps 
{
    name: string;
    size?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'w-7 h-7' }) => {
    return (
      <div className={`relative inline-flex items-center justify-center ${size} overflow-hidden bg-slate-300 rounded-full dark:bg-slate-600 mr-2`}>
        <span className="font-medium text-sm text-gray-600 dark:text-gray-200">
          {name.slice(0, 1).toUpperCase()}
        </span>
      </div>
    );
  };
  