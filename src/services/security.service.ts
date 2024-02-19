import { Injectable } from '@angular/core';
import { SecurityAgent } from '../classes/agent.classe';

@Injectable({
    providedIn: 'root',
})

export class SecurityService {
    public agents: SecurityAgent[] = [
        new SecurityAgent('Thibaut'),
        new SecurityAgent('Vianney'),
        new SecurityAgent('Théotime'),
        new SecurityAgent('Baptiste'),
    ];

    private alertToAgentMap = new Map<string, string>();

    assignAgentToAlert(alertMessage: string, agentName: string): boolean {
        const agent = this.agents.find(a => a.name === agentName);
        if (agent && agent.isAvailable) {
            agent.isAvailable = false;
            this.alertToAgentMap.set(alertMessage, agentName); // Mise à jour de la map pour associer l'alerte à l'agent
            console.log(`Agent ${agent.name} assigné à l'alerte: ${alertMessage}`);
            return true;
        }
        return false;
    }

    getAssignedAgentForAlert(alertMessage: string): string | null {
        return this.alertToAgentMap.get(alertMessage) || null;
    }

    releaseAgent(agentName: string): void {
        const agent = this.agents.find(a => a.name === agentName);
        if (agent) {
            agent.isAvailable = true;
            // Supprimer l'agent de la map pour nettoyer les entrées après libération
            this.alertToAgentMap.forEach((value, key) => {
                if (value === agentName) this.alertToAgentMap.delete(key);
            });
            console.log(`Agent ${agentName} libéré`);
        }
    }

    resolveAlert(alertMessage: string): void {
        console.log(`Alerte résolue: ${alertMessage}`);
        const agentName = this.getAssignedAgentForAlert(alertMessage);
        if (agentName) {
            this.releaseAgent(agentName);
        }
    }
}
