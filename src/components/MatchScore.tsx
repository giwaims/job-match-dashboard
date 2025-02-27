interface MatchScoreProps {
    score: number;
}

export default function MatchScore({ score }: MatchScoreProps) {
    let colorClass = '';
    if (score >= 80) colorClass = 'bg-green-500';
    else if (score >= 50) colorClass = 'bg-yellow-500';
    else colorClass = 'bg-red-500';

    return (
        <div className="flex items-center">
            <div className={`h-4 rounded ${colorClass}`} style={{ width: `${score}%` }}></div>
            <span className="ml-2 text-sm">{score}%</span>
        </div>
    );
}