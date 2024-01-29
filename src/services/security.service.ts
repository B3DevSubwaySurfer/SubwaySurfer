import { Injectable } from '@angular/core';
import { SecurityAgent } from '../classes/agent.classe';

@Injectable({
    providedIn: 'root',
})
export class SecurityService {
    agents: SecurityAgent[] = [
        new SecurityAgent('Thibaut'),
        new SecurityAgent('Vianney'),
        new SecurityAgent('Théotime'),
        new SecurityAgent('Baptiste'),
    ];

    assignAgentToAlert(alertMessage: string, agentName: string): void {
        const agent = this.agents.find(a => a.name === agentName);
        if (agent && agent.isAvailable) {
            agent.isAvailable = false;
            console.log(`Agent ${agent.name} assigné à l'alerte: ${alertMessage}`);
            // Autres logiques spécifiques à l'assignation
        }
    }

    releaseAgent(agentName: string): void {
        const agent = this.agents.find(a => a.name === agentName);
        if (agent) {
            agent.isAvailable = true;
            console.log(`Agent ${agentName} libéré`);
        }
    }

    resolveAlert(alertMessage: string): void {
        console.log(`Alerte résolue: ${alertMessage}`);
        // Libérer un agent assigné à l'alerte
        // Par exemple, libérer le premier agent non disponible (simplification)
        const busyAgent = this.agents.find(agent => !agent.isAvailable);
        if (busyAgent) {
            this.releaseAgent(busyAgent.name);
        }
    }
}

